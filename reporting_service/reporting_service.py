# reporting_service/models.py
from django.db import models

class Report(models.Model):
    report_id = models.AutoField(primary_key=True)
    user_id = models.IntegerField()
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Report {self.report_id} for User {self.user_id}'

# reporting_service/serializers.py
from rest_framework import serializers
from .models import Report

class ReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Report
        fields = '__all__'

# reporting_service/views.py
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from .models import Report
from .serializers import ReportSerializer

class ReportViewSet(viewsets.ViewSet):
    def create(self, request):
        serializer = ReportSerializer(data=request.data)
        if serializer.is_valid():
            report = serializer.save()
            return Response({'report_id': report.report_id}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def list(self, request):
        reports = Report.objects.all()
        serializer = ReportSerializer(reports, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        try:
            report = Report.objects.get(pk=pk)
            serializer = ReportSerializer(report)
            return Response(serializer.data)
        except Report.DoesNotExist:
            return Response({'error': 'Report not found'}, status=status.HTTP_404_NOT_FOUND)

    def update(self, request, pk=None):
        try:
            report = Report.objects.get(pk=pk)
            serializer = ReportSerializer(report, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Report.DoesNotExist:
            return Response({'error': 'Report not found'}, status=status.HTTP_404_NOT_FOUND)

    def destroy(self, request, pk=None):
        try:
            report = Report.objects.get(pk=pk)
            report.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Report.DoesNotExist:
            return Response({'error': 'Report not found'}, status=status.HTTP_404_NOT_FOUND)

# reporting_service/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ReportViewSet

router = DefaultRouter()
router.register(r'reports', ReportViewSet, basename='report')

urlpatterns = [
    path('', include(router.urls)),
]

# reporting_service/tests.py
from rest_framework import status
from rest_framework.test import APITestCase
from .models import Report

class ReportTests(APITestCase):
    def test_create_report(self):
        response = self.client.post('/reports/', {'user_id': 1, 'content': 'Test report content.'})
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Report.objects.count(), 1)
        self.assertEqual(Report.objects.get().content, 'Test report content.')

    def test_list_reports(self):
        Report.objects.create(user_id=1, content='First report')
        Report.objects.create(user_id=2, content='Second report')
        response = self.client.get('/reports/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

    def test_retrieve_report(self):
        report = Report.objects.create(user_id=1, content='Test report')
        response = self.client.get(f'/reports/{report.report_id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['content'], 'Test report')

    def test_update_report(self):
        report = Report.objects.create(user_id=1, content='Old content')
        response = self.client.put(f'/reports/{report.report_id}/', {'user_id': 1, 'content': 'Updated content'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        report.refresh_from_db()
        self.assertEqual(report.content, 'Updated content')

    def test_delete_report(self):
        report = Report.objects.create(user_id=1, content='To be deleted')
        response = self.client.delete(f'/reports/{report.report_id}/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Report.objects.count(), 0)