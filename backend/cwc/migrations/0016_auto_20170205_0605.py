# -*- coding: utf-8 -*-
# Generated by Django 1.10.3 on 2017-02-05 06:05
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cwc', '0015_auto_20170205_0601'),
    ]

    operations = [
        migrations.AlterField(
            model_name='source',
            name='title',
            field=models.CharField(max_length=500),
        ),
    ]
