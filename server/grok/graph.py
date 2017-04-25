from flask_graphql import GraphQLView
from flask_login import login_required
from . import app
from .graphql.schema import schema

app.add_url_rule(
    '/graphql',
    view_func=login_required(
        GraphQLView.as_view('graphql', schema=schema, graphiql=True))
)
