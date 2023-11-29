from django.dispatch import receiver
from django.db.models.signals import post_save
from allauth.account.signals import user_signed_up
from django.contrib.auth.models import Group
from django.contrib.auth.models import User
from .models import Author

@receiver(user_signed_up)
def user_signed_up_halder(request, user, **kwargs):
    username = user.username
    if username.lower() == 'admin':

        admin_group, created = Group.objects.get_or_create(name='Admins')
        user.groups.add(admin_group)
        user.is_superuser = True
        user.save()
    else:
        temporary_storage_managers_group, created = Group.objects.get_or_create(name='Temporary Storage Managers')
        user.groups.add(temporary_storage_managers_group)


@receiver(post_save, sender=User)
def save_author_profile(sender, instance, created, **kwargs):

    if created:
        # print(sender.username)
        Author.objects.create(user=instance, name=instance.username)
    else:
        instance.author.save()

