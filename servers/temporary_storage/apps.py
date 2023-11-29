from django.apps import AppConfig


class TemporaryStorageConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'temporary_storage'

    def ready(self) -> None:
        import temporary_storage.signals
