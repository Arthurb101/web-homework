defmodule HomeworkWeb.Schemas.CompaniesSchema do
  @moduledoc """
  Defines the graphql schema for companies.
  """
  use Absinthe.Schema.Notation

  alias HomeworkWeb.Resolvers.CompaniesResolver

  object :company do
    field(:id, non_null(:id))
    field(:name, :string)
    field(:credit_line, :integer)
    field(:available_credit, :integer)
  end

end