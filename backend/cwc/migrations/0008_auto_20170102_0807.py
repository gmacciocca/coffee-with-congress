# -*- coding: utf-8 -*-
# Generated by Django 1.10.3 on 2017-01-02 08:07
from __future__ import unicode_literals

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('cwc', '0007_auto_20170102_0806'),
    ]

    operations = [
        migrations.AlterField(
            model_name='printedletter',
            name='when',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
    ]
