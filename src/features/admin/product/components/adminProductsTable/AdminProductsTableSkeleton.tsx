import { Skeleton } from "@/components/skeleton/Skeleton";
import { TableRow } from "@/components/ui/table/TableRow";
import TableCell from "@/components/ui/table/TableCell";

const SkeletonRow = () => (
  <TableRow>
    <TableCell>
      <Skeleton className="h-4 w-6" />
    </TableCell>
    <TableCell>
      <Skeleton className="h-4 w-40 mb-1" />
      <Skeleton className="h-3 w-24" />
    </TableCell>
    <TableCell>
      <Skeleton className="h-4 w-16" />
    </TableCell>
    <TableCell>
      <Skeleton className="h-4 w-10" />
    </TableCell>
    <TableCell>
      <Skeleton className="h-4 w-10" />
    </TableCell>
    <TableCell>
      <Skeleton className="h-4 w-12" />
    </TableCell>
    <TableCell>
      <Skeleton className="h-4 w-14" />
    </TableCell>
  </TableRow>
);

const AdminProductsTableSkeleton = () => (
  <>
    {Array.from({ length: 9 }).map((_, i) => (
      <SkeletonRow key={i} />
    ))}
  </>
);

export default AdminProductsTableSkeleton;
