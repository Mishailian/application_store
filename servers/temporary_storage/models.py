from django.db import models, transaction
from django.contrib.auth.models import User
from django.db.models import Min

# update my custom id 
class Max_number(models.Model):
    number = models.PositiveIntegerField(default=0)
    
    @classmethod
    def get_number(cls):
        with transaction.atomic():
            max_number_instance, create = cls.objects.get_or_create(pk=1)
            max_number_instance.number += 1
            max_number_instance.save()
            return max_number_instance.number

# check free slots for reuse custom id 
class Free_id(models.Model):
    name = models.CharField(max_length=100)
    free_id = models.PositiveIntegerField(primary_key=True, unique=True)

#main class 
class Temporary_storage(models.Model):
    #custom id dnt touch
    id = models.AutoField(primary_key=True, unique=True)
    name = models.CharField(max_length=255)
    price_id = models.TextField(max_length=255, null=True, blank=True)
    date_create = models.DateField(auto_now_add=True)
    data_dead_line = models.DateField(null=True)
    data_update = models.DateField(auto_now=True)
    about = models.JSONField(null=True, blank=True)
    author = models.ForeignKey('Author', on_delete=models.PROTECT, null=True)
    executor = models.ForeignKey('Executor', on_delete=models.PROTECT, null=True)
    tags = models.ManyToManyField('Tag_post', related_name='tags', blank=True)

    class Meta:
        ordering = ['-date_create']

    def save(self, *args, **kwargs):
        if not self.id:  # Если id не существует (POST запрос)
            min_value = Free_id.objects.aggregate(min_value=Min('free_id'))['min_value']
            if min_value is not None:
                free_id_obj = Free_id.objects.get(free_id=min_value)
                self.id = min_value
                free_id_obj.delete()
            else:
                self.id = Max_number.get_number()

        super(Temporary_storage, self).save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        model_name = self._meta.model_name
        freed_id = self.id
        super().delete(*args, **kwargs)
        #create new free slot in database
        Free_id.objects.create(name=model_name, free_id=freed_id)
    def __str__(self):
        return self.name if self.name else f'Temporary_storage {self.id}'

class Archive(models.Model):
    ...    


class Tag_post(models.Model):
    name = models.CharField(max_length=100, unique=True)
    
    def __str__(self) -> str:
        return self.name


class Executor(models.Model):
    name = models.CharField(max_length=45, unique=True)

    def __str__(self) -> str:
        return self.name


class Author(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=75, unique=True)
    
    def __str__(self) -> str:
        return self.name
