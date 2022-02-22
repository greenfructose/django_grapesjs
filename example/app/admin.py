from django.contrib import admin
from app.models import Block
from django_grapesjs.admin import GrapesJsAdminMixin


@admin.register(Block)
class Block(GrapesJsAdminMixin, admin.ModelAdmin):
    pass

