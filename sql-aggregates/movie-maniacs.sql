select "customers"."firstName",
       "customers"."lastName",
       sum("payments"."amount") as "totalAmount"
from "payments"
join "customers" using ("customerId")
group by "customerId"
order by "totalAmount" desc;
