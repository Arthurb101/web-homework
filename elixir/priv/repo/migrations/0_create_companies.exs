defmodule Homework.Repo.Migrations.CreateCompanies do
  use Ecto.Migration
# both credit line and available_credit are in pennies for easy storage and conversion

  def change do
    create table(:companies, primary_key: false) do
      add(:id, :uuid, primary_key: true)
      add(:name, :string)
      add(:credit_line, :integer, default: 0, null: false)
      add(:available_credit , :integer, default: 0, null: false)

      timestamps()
    end
  end
end
