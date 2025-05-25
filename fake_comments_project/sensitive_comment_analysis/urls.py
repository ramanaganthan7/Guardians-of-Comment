from django.urls import path
from . import views

urlpatterns = [
    path('sensitivecomment/', views.analyze_comment, name='sensitivecomment'),
]
