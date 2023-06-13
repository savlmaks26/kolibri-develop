from django.conf.urls import url

from .views import download_csv_file
from .views import exported_csv_info
from .views import first_log_date

urlpatterns = [
    url(
        r"^downloadcsvfile/(?P<csv_type>.*)/(?P<facility_id>.*)/$",
        download_csv_file,
        name="download_csv_file",
    ),
    url(
        r"^exportedcsvinfo/(?P<facility_id>.*)/$",
        exported_csv_info,
        name="exportedcsvinfo",
    ),
    url(
        r"^firstlogdate/(?P<facility_id>.*)/$",
        first_log_date,
        name="firstlogdate",
    ),
]
