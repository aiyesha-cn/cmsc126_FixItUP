import React, { useState } from 'react';
import DashboardHeader from '@/Components/Admin/DashboardHeader';
import AdminOverview from '@/Components/Admin/AdminOverview';

export default function AdminDashboard() {
    return (
        <div>
            <DashboardHeader />
            <br></br>
            <AdminOverview/>

            <div>
                <table>
                    
                </table>
            </div>

        </div>
    );
}