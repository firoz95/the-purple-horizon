
import React from "react";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatIndianCurrency } from "@/utils/formatters";

type AgendaItem = {
  id: string;
  type: string;
  title: string;
  date: string;
  amount: number;
  percentage: string;
  status: string;
}

type AgendaAlertProps = {
  amount?: number;
  dueDate?: string;
  agendaItems?: AgendaItem[];
  onViewNotice?: (itemId: string) => void;
}

const AgendaAlert: React.FC<AgendaAlertProps> = ({ 
  amount, 
  dueDate, 
  agendaItems = [], 
  onViewNotice = () => {} 
}) => {
  // If we have specific amount/dueDate props, create a single agenda item
  const items = agendaItems?.length 
    ? agendaItems 
    : (amount && dueDate 
      ? [{
          id: "capital-call",
          type: "Capital Call",
          title: "Capital Call Notice",
          date: dueDate,
          amount: amount,
          percentage: "10%", // Default percentage
          status: "pending"
        }] 
      : []);

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-6">
      <div className="flex items-start">
        <AlertCircle className="h-6 w-6 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
        <div className="w-full">
          <h2 className="text-lg font-bold text-red-700 mb-2">Pending Action Required</h2>
          {items.map((item) => (
            <div key={item.id} className="mb-4">
              <h3 className="text-md font-medium text-gray-800">{item.title}</h3>
              <p className="text-sm text-gray-600 mb-2">
                Due Date: <span className="font-bold text-red-600">{item.date}</span>
              </p>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <p className="text-sm">
                  Amount: <span className="font-medium text-gray-800">{formatIndianCurrency(item.amount)}</span> ({item.percentage} of total commitment)
                </p>
                <Button 
                  variant="outline"
                  size="sm"
                  className="border-red-200 text-red-600 hover:bg-red-50 sm:ml-auto"
                  onClick={() => onViewNotice(item.id)}
                >
                  View Notice
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AgendaAlert;
