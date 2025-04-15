
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatIndianCurrency } from "@/utils/formatters";

type NavHistoryItem = {
  date: string;
  value: number;
}

type NavChartProps = {
  navHistory: NavHistoryItem[];
}

const NavChart: React.FC<NavChartProps> = ({ navHistory }) => {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-gray-600">Period</TableHead>
            <TableHead className="text-gray-600">NAV</TableHead>
            <TableHead className="text-gray-600">Change</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {navHistory.map((item, index) => {
            const prevValue = index > 0 ? navHistory[index - 1].value : item.value;
            const change = ((item.value - prevValue) / prevValue) * 100;
            
            return (
              <TableRow key={item.date}>
                <TableCell className="font-medium">{item.date}</TableCell>
                <TableCell title={formatIndianCurrency(item.value, 'full')}>
                  {formatIndianCurrency(item.value)}
                </TableCell>
                <TableCell>
                  {index === 0 ? (
                    "—"
                  ) : (
                    <span className={change >= 0 ? "text-green-600" : "text-red-600"}>
                      {change >= 0 ? "+" : ""}{change.toFixed(2)}%
                    </span>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default NavChart;
