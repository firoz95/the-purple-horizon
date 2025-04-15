
import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatIndianCurrency } from '@/utils/formatters';

type AgendaAlertProps = {
  amount: number;
  dueDate: string;
  onViewNotice: (id: string) => void;
};

const AgendaAlert: React.FC<AgendaAlertProps> = ({ amount, dueDate, onViewNotice }) => {
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
      <div className="flex items-start md:items-center flex-col md:flex-row gap-4 md:gap-0 justify-between">
        <div className="flex items-center">
          <AlertCircle className="h-5 w-5 text-amber-600 mr-3 flex-shrink-0" />
          <div>
            <h3 className="font-medium text-amber-800">Pending Capital Call</h3>
            <p className="text-amber-700 text-sm mt-1">
              {formatIndianCurrency(amount)} due by {dueDate}
            </p>
          </div>
        </div>
        <Button 
          variant="outline" 
          size="sm"
          className="bg-white border-amber-300 text-amber-800 hover:bg-amber-100"
          onClick={() => onViewNotice('capital-call-1')}
        >
          View Notice
        </Button>
      </div>
    </div>
  );
};

export default AgendaAlert;
