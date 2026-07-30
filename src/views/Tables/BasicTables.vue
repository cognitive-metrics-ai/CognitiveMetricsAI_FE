<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <div class="space-y-6">
      <ComponentCard title="Employee Directory (ID, First Name, Last Name, DOB, DOH)">
        <EmployeeTable />
      </ComponentCard>

      <ComponentCard title="Core-HR Performance Reviews (Cycle, Goals, Competencies, Reviews, Calibration)">
        <PerformanceTable />
      </ComponentCard>
      
      <ComponentCard title="Project Team Table">
        <BasicTableOne />
      </ComponentCard>
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref } from "vue";
import PageBreadcrumb from "@/components/common/PageBreadcrumb.vue";
import AdminLayout from "@/components/layout/AdminLayout.vue";
import ComponentCard from "@/components/common/ComponentCard.vue";
import EmployeeTable from "@/components/tables/EmployeeTable.vue";
import PerformanceTable from "@/components/tables/PerformanceTable.vue";
import BasicTableOne from "@/components/tables/basic-tables/BasicTableOne.vue";

const currentPageTitle = ref("Employee Directory & Performance Tables");
</script>
