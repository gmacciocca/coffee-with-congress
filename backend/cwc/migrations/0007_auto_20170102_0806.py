# -*- coding: utf-8 -*-
# Generated by Django 1.10.3 on 2017-01-02 08:06
from __future__ import unicode_literals

import datetime
from django.db import migrations, models
import django.db.models.deletion
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('cwc', '0006_template_level'),
    ]

    operations = [
        migrations.CreateModel(
            name='PrintedLetter',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('when', models.DateTimeField(default=datetime.datetime(2017, 1, 2, 8, 6, 16, 811368, tzinfo=utc))),
                ('level', models.CharField(choices=[('federal', 'Federal'), ('state', 'State'), ('city', 'City')], default='city', max_length=10)),
                ('state_code', models.CharField(max_length=3)),
                ('issue', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='cwc.Issue')),
            ],
        ),
        migrations.RemoveField(
            model_name='location',
            name='city',
        ),
        migrations.RemoveField(
            model_name='location',
            name='state',
        ),
        migrations.RemoveField(
            model_name='representation',
            name='city',
        ),
        migrations.RemoveField(
            model_name='representation',
            name='contact',
        ),
        migrations.RemoveField(
            model_name='representation',
            name='location',
        ),
        migrations.RemoveField(
            model_name='representation',
            name='state',
        ),
        migrations.AlterField(
            model_name='template',
            name='city',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='cwc.City'),
        ),
        migrations.AlterField(
            model_name='template',
            name='state',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='cwc.State'),
        ),
        migrations.DeleteModel(
            name='Contact',
        ),
        migrations.DeleteModel(
            name='Location',
        ),
        migrations.DeleteModel(
            name='Representation',
        ),
    ]