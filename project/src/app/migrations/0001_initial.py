from django.db import migrations

class Migration(migrations.Migration):

    initial = True

    dependencies = [
        # Define any dependencies if necessary
    ]

    operations = [
        migrations.CreateModel(
            name='GameplayMetrics',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('player_id', models.IntegerField()),
                ('score', models.IntegerField()),
                ('level_reached', models.IntegerField()),
                ('duration_played', models.DurationField()),
                ('date_played', models.DateTimeField(auto_now_add=True)),
            ],
            options={
                'verbose_name_plural': 'Gameplay Metrics',
            },
        ),
    ]
