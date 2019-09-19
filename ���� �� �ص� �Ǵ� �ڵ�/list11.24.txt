from google.appengine.api import memcache

memcache.set('my-key', 'my-value')
memcache.get('my-key')
memcache.delete('my-key')