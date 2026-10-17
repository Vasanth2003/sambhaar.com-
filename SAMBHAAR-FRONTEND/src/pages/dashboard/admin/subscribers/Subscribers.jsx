import { useState } from "react";
import { useGetAllSubscriptionsQuery } from "../../../../redux/features/subscriptions/subscriptionsApi";
import { formatDate } from "../../../../util/formatDate";

const Subscribers = () => {
const { data, error, isLoading } = useGetAllSubscriptionsQuery();
const [today,setToday]  = useState(new Date())
const [end,setEnd]  = useState()

const subscriptions = data?.subscriptions || [];


  const truncateText = (text, maxLength) => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  if (isLoading) return <div>Loading...</div>;
  if (error || !subscriptions?.length) return <div>No Subscribers Found!</div>;

const getEndDate = (startDate, durationInMonths) => {
  const date = new Date(startDate);
  date.setDate(date.getDate() + durationInMonths * 30);
  return date; // ✅ Return the Date object
};


  return (
    <section className="py-1 bg-blueGray-50">
      <div className="w-full mb-12 xl:mb-0 px-4 mx-auto">
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
          <div className="rounded-t mb-0 px-4 py-3 border-0">
            <div className="flex flex-wrap items-center">
              <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                <h2 className="text-2xl font-bold mb-4 px-4">Manage Subscribers</h2>
              </div>
            </div>
          </div>

          <div className="block w-full overflow-x-auto">
            <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 font-medium text-gray-900">Name</th>
                  <th className="px-6 py-4 font-medium text-gray-900">Email</th>
                  <th className="px-6 py-4 font-medium text-gray-900">Phone</th>
                  <th className="px-6 py-4 font-medium text-gray-900">Address</th>
                  <th className="px-6 py-4 font-medium text-gray-900">Duration (months)</th>
                  <th className="px-6 py-4 font-medium text-gray-900">Start Date</th>
                  <th className="px-6 py-4 font-medium text-gray-900">End Date</th>

                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                {subscriptions.map((subscriber, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-normal">
                      {truncateText(subscriber?.name, 20)}
                    </td>
                    <td className="px-6 py-4 font-normal">
                      {truncateText(subscriber?.email, 25)}
                    </td>
                    <td className="px-6 py-4 font-normal">{subscriber?.phone}</td>
                    <td className="px-6 py-4 font-normal">
                      {subscriber?.address
                        ? `${subscriber.address.city}, ${subscriber.address.state}, ${subscriber.address.country}`
                        : "N/A"}
                    </td>
                    <td className="px-6 py-4 font-normal">
                      {subscriber?.duration}
                    </td>
                    <td className="px-6 py-4 font-normal">
                      {formatDate(subscriber?.startDate)}
                    </td>
                    {(() => {
                        const endDate = getEndDate(subscriber?.startDate, subscriber?.duration);
                        const today = new Date();

                        const isToday = today.toDateString() === endDate.toDateString(); // ✅ Safe date comparison

                        return (
                            <td className={`px-6  font-normal ${isToday ? "bg-primary text-white rounded-xl" : "bg-transparent   "}`}>
                            {formatDate(endDate)}
                            </td>
                        );
                        })()}


                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Subscribers;
