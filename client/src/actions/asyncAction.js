export default (name, action) => (dispatch) => {
  dispatch({ type: `${name}_REQUEST` });

  return action()
    .then((data) => {
      dispatch({ type: `${name}_SUCCESS`, data });
    })
    .catch(() => {
      dispatch({ type: `${name}_FAILURE` });
    });
};
