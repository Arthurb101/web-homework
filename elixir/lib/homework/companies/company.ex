defmodule Homework.Companies.Company do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key {:id, :binary_id, autogenerate: true}
  schema "companies" do
    field(:name, :string)
    field(:credit_line, :integer)
    field(:available_credit, :integer)

    timestamps()
  end

  @doc false
  def changeset(company, attrs) do
    company
    |> cast(attrs, [:name, :credit_line, :available_credit])
    |> validate_required([:name])
    |> validate_number(:credit_line, greater_than_or_equal_to: 0)
    |> validate_number(:available_credit, greater_than_or_equal_to: 0)
  end
end
