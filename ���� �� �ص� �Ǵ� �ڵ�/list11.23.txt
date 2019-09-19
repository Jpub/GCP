from google.appengine.ext impor tndb

class TodoList(ndb.Model):
	name = ndb.StringProperty()
	completed = ndb.BooleanProperty()

# Create a new TodoList
my_list = TodoList(name='Groceries', completed=False)
key = my_list.put()

# Find TodoLists by name
lists = TodoList.query(name='Groceries')

# Delete the TodoList by ID
my_list.delete()