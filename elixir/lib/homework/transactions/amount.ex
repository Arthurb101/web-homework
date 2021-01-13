defmodule Types.Amount do
  use Ecto.Type 
 
  def type, do: :integer

  def cast(integer) when is_float(integer) do
    { :ok, Kernel.trunc(integer*100) }
  end

  def cast(_), do: :error

  def load(integer) when is_integer(integer), do: {:ok, integer}

  def dump(integer) when is_integer(integer), do: {:ok, integer}

end