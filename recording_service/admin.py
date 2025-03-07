# recording_service/admin.py
from django.contrib import admin
from .models import GameplaySession

@admin.register(GameplaySession)
class GameplaySessionAdmin(admin.ModelAdmin):
    list_display = ('session_id', 'game_title', 'created_at')
