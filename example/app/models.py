import os
from django.db import models
from django.utils.text import slugify

from django_grapesjs.models import GrapesJsHtmlField


class Block(models.Model):
    name = models.CharField(max_length=255, unique=True)
    slug = models.SlugField(max_length=255, blank=True, null=True)
    file_path = models.CharField(max_length=255, default='templates/')
    html = GrapesJsHtmlField(apply_django_tag=True)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        self.slug = slugify(self.name)
        if not str(self.file_path)[-1] == '/':
            self.file_path = str(self.file_path) + '/'
        if not os.path.exists(str(self.file_path)):
            os.makedirs(str(self.file_path))
        with open(f'{self.file_path}{self.slug}.html', 'w+') as f:
            f.write(str(self.html))
        super(Block, self).save(*args, **kwargs)

# class ExampleModel(models.Model):
#     name = models.CharField(max_length=255)
#     slug = models.SlugField(blank=True)
#     html = GrapesJsHtmlField(
#         default_html='templates/bootstrap5/base.html',
#         apply_django_tag=True,
#         template_choices=(
#             ('templates/bootstrap5/base.html', 'Base - Bootstrap 5'),
#             ('templates/bootstrap5/cover.html', 'Cover - Bootstrap 5'),
#             ('templates/bootstrap5/header.html', 'Header - Bootstrap 5'),
#             ('templates/bootstrap5/footer.html', 'Footer - Bootstrap 5'),
#         )
#      )
#     file_path = models.CharField(max_length=255, default='/templates/default/')
#
#     def __str__(self):
#         return self.name
#
#     def save(self, *args, **kwargs):
#         self.slug = slugify(self.name)
#         with open(f'{self.file_path}{self.slug}.html', 'w+') as f:
#             f.write(str(self.html))
#         print('args:')
#         print(args)
#         print('kwargs:')
#         print(kwargs)
#         super(ExampleModel, self).save(*args, **kwargs)
