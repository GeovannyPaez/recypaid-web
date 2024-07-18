import React from "react";
import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

interface SkeletonTableProps {
    columns: number;
    rows: number;
}

const SkeletonTable: React.FC<SkeletonTableProps> = ({ columns, rows }) => {
    return (
        <div className="border rounded-lg w-full">
            <div className="relative w-full overflow-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            {Array.from({ length: columns }).map((_, colIndex) => (
                                <TableHead
                                    key={colIndex}
                                    className={colIndex === columns - 1 ? "text-right" : ""}
                                >
                                    <Skeleton className="h-4 w-full rounded" />
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {Array.from({ length: rows }).map((_, rowIndex) => (
                            <TableRow key={rowIndex}>
                                {Array.from({ length: columns }).map((_, colIndex) => (
                                    <TableCell
                                        key={colIndex}
                                        className={colIndex === columns - 1 ? "text-right" : ""}
                                    >
                                        <Skeleton className="h-4 w-full rounded" />
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default SkeletonTable;
