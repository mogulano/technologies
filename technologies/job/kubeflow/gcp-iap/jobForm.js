const axios = require('axios');
const { Response } = require('@saagie/sdk');

const { JWT } = require('google-auth-library');


/**
 * Example of function to retrieve select options from an external endpoint.
 * @param {Object} entity - Contains entity data including featuresValues.
 * @param {Object} entity.featuresValues - Contains all the values from the entity features declared in the context.yaml
 */
exports.getItems = async ({ featuresValues }) => {
  try {
    const credentials = JSON.parse(featuresValues.endpoint.serviceAccountKey);
    const baseUrl = featuresValues.endpoint.url;

    const authClient = new JWT({
      email: credentials.client_email,
      key: credentials.private_key,
      scopes: ['https://www.googleapis.com/auth/cloud-platform']
    });
    console.log("after authent")

    // depends on category :
    const url = `${featuresValues.endpoint.url}/apis/v1beta1/pipelines`;
    console.log("URL :")
    console.log(url)

    const res = await authClient.request({ url });
    console.log("res :")
    console.log(res);

    if (!res.data.pipelines || !res.data.pipelines.length) {
      return Response.empty('No data available');
    }
    return Response.success(
        res.data.pipelines.map(({ name, id }) => ({
          id,
          label: name,
        })),
    );
  } catch (error) {
    return Response.error("Can't retrieve data", { error });
  }
};

/*exports.getDatasets = async ({ featuresValues }) => {
  try {
    const { data: datasets } = await axios.get(
        baseUrl+'/apis/v1beta1/pipelines',
    );

    if (!datasets || !datasets.length) {
      return Response.empty('No datasets availables');
    }

    return Response.success(
      datasets.map(({ name, id }) => ({
        id,
        label: name,
      })),
    );
  } catch (error) {
    return Response.error("Can't retrieve datasets", { error });
  }
};*/

