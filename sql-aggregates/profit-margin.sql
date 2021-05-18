with "revenue" as (
    select "films"."filmId",
          "films"."title",
          sum("payments"."amount") as "totalRevenue"
    from "inventory"
    join "films" using ("filmId")
    join "rentals" using ("inventoryId")
    join "payments" using ("rentalId")
    group by "films"."filmId"
    order by "films"."filmId"
),

"cost" as (
    select "films"."filmId",
          "films"."title",
          "films"."replacementCost",
          count("inventory"."filmId") as "filmCount",
          "films"."replacementCost" * count("inventory"."filmId") as "totalCost"
    from "inventory"
    join "films" using ("filmId")
    group by "films"."filmId"
    order by "films"."filmId"
)

select "revenue"."filmId",
      "revenue"."title",
      "revenue"."totalRevenue",
      "cost"."totalCost",
      "revenue"."totalRevenue" - "cost"."totalCost" as "netProfit"
from "revenue"
join "cost" using ("filmId")
order by "netProfit" desc
limit 5;
