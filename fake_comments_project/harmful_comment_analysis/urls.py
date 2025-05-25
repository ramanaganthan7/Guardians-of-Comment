from django.urls import path
from .views import harmful_comment_view, test_view

urlpatterns = [
    path('harmfulcomment/', harmful_comment_view),
    path('test/', test_view),
]
