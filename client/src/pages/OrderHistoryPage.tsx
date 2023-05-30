// import nessesary dependencies and files
import { Button } from 'react-bootstrap'
import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { useGetOrderHistoryQuery } from '../hooks/orderHooks'
import { ApiError } from "../types/ApiError";
import { getError } from "../utils";


// Define OrderHistoryPage component
export default function OrderHistoryPage() {
  // useNavigate hook to navigate to different pages
  const navigate = useNavigate()

  // useGetOrderHistoryQuery hook to get order history
  const { data: orders, isLoading, error } = useGetOrderHistoryQuery()

  // return OrderHistoryPage component
  return (
    <div>
      <Helmet>
        <title>Order History</title>
      </Helmet>

      <h1>Order History</h1>
      { // if loading, show LoadingBox component
      isLoading ? (
        <LoadingBox></LoadingBox>
      ) : error ? // if error, show MessageBox component
      (
        <MessageBox variant="danger">{getError(error as ApiError)}</MessageBox>
      ) : 
      (
        // if orders exist, show orders in a table  
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            { // map through orders and show each order in a row
            orders!.map((order) => (
              // show order details in a row
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.totalPrice.toFixed(2)}</td>
                <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'No'}</td>
                <td>
                  {order.isDelivered
                    ? order.deliveredAt.substring(0, 10)
                    : 'No'}
                </td>
                <td>
                  <Button
                    type="button"
                    variant="light"
                    onClick={() => {
                      navigate(`/order/${order._id}`)
                    }}
                  >
                    Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}