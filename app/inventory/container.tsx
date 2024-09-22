import React from 'react'
import { useState } from 'react';

import { Payment, columns } from "./columns"
import { DataTable } from "./data-table"
import {PaymentData } from './inventory'


const Container = ({ paymentData }: { paymentData: PaymentData })  => {
  return (
    <div className="container mx-auto py-10">
    <DataTable columns={columns} data={paymentData.payment} />
</div>
  )
}
export default Container