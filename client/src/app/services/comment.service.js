import httpService from "./http.service";

const commentEndPoint = "comment/";

const commentService = {
  update: async (id, content) => {
    const { data } = await httpService.put(commentEndPoint + id, content);
    return data;
  },
  get: async (id) => {
    const { data } = await httpService.get(commentEndPoint + id);
    return data;
  },
  getAll: async (pageId) => {
    const { data } = await httpService.get(commentEndPoint, {
      params: {
        orderBy: '"pageId"',
        equalTo: `"${pageId}"`
      }
    });
    return data;
  },
  create: async (payload) => {
    const { data } = await httpService.put(
      commentEndPoint + payload._id,
      payload
    );
    return data;
  },
  delete: async (id) => {
    const { data } = await httpService.delete(commentEndPoint + id);
    return data;
  }
};

export default commentService;
