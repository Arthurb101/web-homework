# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Homework.Repo.insert!(%Homework.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

alias Homework.Companies
alias Homework.Merchants
alias Homework.Users

company_struct =  Companies.create_company(%{name: "Big Company", credit_line: 1000000, available_credit: 1000000}) |> elem(1)
IO.inspect(company_struct.id)


user_data = [%{dob: "October 23, 1976", first_name: "Ryan", last_name: "Reynolds", company_id: company_struct.id},
                %{dob: "November 12, 1980", first_name: "Ryan", last_name: "Gosling", company_id: company_struct.id},
               %{dob: "May 6, 1961", first_name: "George", last_name: "Clooney", company_id: company_struct.id}]

merchant_data = [%{description: "wig company", name: "BigWig"},
             %{description: "Cookie company", name: "Crumbl"},
             %{description: "Mattress company", name: "Purple"}]


Enum.each(user_data, fn(data) ->
  Users.create_user(data)
end)

Enum.each(merchant_data, fn(data) ->
    Merchants.create_merchant(data)
end)

io.puts("seeded database")

        
       