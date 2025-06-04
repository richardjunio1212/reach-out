import { Button } from '@/components/ui/button';
import { ArrowUpDown } from 'lucide-react';

export const TeacherReferralHistoryColumns = [
  {
    accessorKey: 'studentNumber',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Student Number
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue('studentNumber')}</div>
    ),
  },
  {
    accessorKey: 'studentName',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Student Name
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue('studentName')}</div>
    ),
  },
  {
    accessorKey: 'remarks',
    header: 'Remark',
    cell: ({ row }) => (
      <div className="truncate capitalize">{row.getValue('remarks')}</div>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue('status')}</div>
    ),
  },
  {
    accessorKey: 'createdAt',
    header: 'Submitted At',
    cell: ({ row }) => (
      <div className="capitalize">
        {row.getValue('createdAt')?.toLocaleString()}
      </div>
    ),
  },
];
