import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Users, SquareKanban, CreditCard } from "lucide-react";

const OverviewCard = ({
  data,
}: {
  data: {
    users: { increaseThisWeek: number; total: number };
    pendingTickets: { increaseThisWeek: number; total: number };
    activeEmployees: { increaseToday: number; total: number };
  };
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
       <CardData title="users" total={data.users.total} week={data.users.increaseThisWeek} icon={<Users className="text-gray-500 size-8 p-1" />}/>
       <CardData title="Pending Tickets" total={data.pendingTickets.total} week={data.pendingTickets.increaseThisWeek} icon={<SquareKanban className="text-gray-500 size-8 p-1" />}/>
       <CardData title="Active Employees" total={data.activeEmployees.total} week={data.activeEmployees.increaseToday} icon={<CreditCard className="text-gray-500 size-8 p-1" />}/>
    </div>
  );
};

export default OverviewCard;


const CardData = ({
  title,
  total,
  week,
  icon
}:{
  title: string;
  total: number
  week: number
  icon: any
}) => {
  return (
    <Card className="p4 shadow-none border-none">
    <CardHeader className="flex flex-row justify-between p-4">
      <div className="space-y-3">
        <h1 className="text-base font-medium text-gray-500">
          {title}
        </h1>
        <p className="text-2xl font-bold">{total}</p>
      </div>
      <div>
        <div className="rounded-full p-2 border border-primary text-primary">
          {icon}
        </div>
      </div>
    </CardHeader>
    <CardContent className="border-t px-4 py-6">
      <div className="flex gap-x-2">
        <p
          className={`text-sm flex items-center gap-x-2 font-bold`}
        >
          <svg
            width={21}
            height={13}
            viewBox="0 0 21 13"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.5406 0.75L16.9082 2.94458L11.8629 7.62125L7.72738 3.78792L0.0664062 10.8988L1.52416 12.25L7.72738 6.5L11.8629 10.3333L18.3762 4.30542L20.7438 6.5V0.75H14.5406Z"
              fill="currentColor"
            />
          </svg>
          {week}
        </p>
        <p className="!text-gray-400">more Tickets this week</p>
      </div>
    </CardContent>
  </Card>
  )
}
