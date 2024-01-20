from django.db import models
from django.contrib.auth.models import User
from django.http import Http404
from django.forms.models import model_to_dict


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


#main class 
class Base_Temporary_storage(models.Model):
    name = models.CharField(max_length=255)
    price_id = models.ImageField(null=True, blank=True)
    date_create = models.DateField(auto_now_add=True)
    data_dead_line = models.DateField(null=True)
    data_update = models.DateField(auto_now=True)
    about = models.JSONField(null=True, blank=True)
    author = models.ForeignKey(Author, on_delete=models.PROTECT, null=True)
    executor = models.ForeignKey(Executor, on_delete=models.PROTECT, null=True)
    tags = models.ManyToManyField(Tag_post, related_name='tags', blank=True)

    class Meta:
        ordering = ['-date_create']


class Temporary_storage(Base_Temporary_storage):

    def archivete(pk):
        Archive.objects.create()


class Undeclared_temporary_storage(Base_Temporary_storage):
    ...

    @classmethod
    def declared(cls, pk):
        try:
            # Get the Undeclared_temporary_storage instance with the given pk
            obj = cls.objects.get(pk=pk)

            # Convert the instance to a dictionary
            obj_data = model_to_dict(obj)

            # Exclude the 'id' field from the dictionary
            obj_data = model_to_dict(
                obj, exclude=['id', 'base_temporary_storage_ptr', 'price_id','tags']
            )

            # Handle the ImageField separately
            obj_data['price_id'] = obj.price_id
            print(obj_data)
            # Create a new instance in Temporary_storage using the dictionary data
            Temporary_storage.objects.create(**obj_data)
            obj.delete()

        except Exception as e:
            raise Http404()


class Archive(Base_Temporary_storage):
    ...

    def dearchivete(pk):
        print(f'pk---{pk}-')

