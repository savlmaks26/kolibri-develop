from django.conf.urls import include
from django.conf.urls import url
from rest_framework import routers

from .api import ExamViewset

router = routers.SimpleRouter()
router.register(r"exam", ExamViewset, basename="exam")

urlpatterns = [url(r"^", include(router.urls))]
