defmodule HomeworkWeb.Router do
  use HomeworkWeb, :router

  pipeline :api do
    plug CORSPlug, origin: "*"
    plug(:accepts, ["json"])
  end

  scope "/" do
    pipe_through(:api)

    forward("/graphiql", Absinthe.Plug.GraphiQL,
      schema: HomeworkWeb.Schema,
      interface: :simple,
      context: %{pubsub: HomeworkWeb.Endpoint}
    )
  end
end
