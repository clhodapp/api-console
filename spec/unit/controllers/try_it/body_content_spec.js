describe("RAML.Controllers.TryIt.BodyContent", function() {
  var bodyContent;

  beforeEach(function() {
    var body = {
      'application/json': {},
      'application/x-www-form-urlencoded': {
        formParameters: {
          data: [ { type: "string" } ]
        }
      }
    }

    bodyContent = new RAML.Controllers.TryIt.BodyContent(body)
  });

  describe("copying data from old content", function() {
    var newBodyContent;

    describe('when adding a new content type', function() {
      beforeEach(function() {
        var newBody = {
          'application/json': {},
          'text/xml': {},
          'application/x-www-form-urlencoded': {
            formParameters: {
              data: [ { type: "string" } ]
            }
          }
        }

        newBodyContent = new RAML.Controllers.TryIt.BodyContent(newBody);

        bodyContent.definitions['application/json'].value = "{ raw: 'json' }";
        newBodyContent.copyFrom(bodyContent);
      });

      it('updates values using the old content types', function() {
        expect(newBodyContent.definitions['application/json'].value).toEqual("{ raw: 'json' }");
      });
    });

    describe('when removing a content type', function() {
      beforeEach(function() {
        var newBody = {
          'application/x-www-form-urlencoded': {
            formParameters: {
              data: [ { type: "string" } ]
            }
          }
        }

        newBodyContent = new RAML.Controllers.TryIt.BodyContent(newBody);

        bodyContent.definitions['application/json'].value = "{ raw: 'json' }";
        newBodyContent.copyFrom(bodyContent);
      });

      it('removes content types that are no longer present', function() {
        expect(newBodyContent.definitions['application/json']).toBeUndefined();
      });
    });
  });
});
