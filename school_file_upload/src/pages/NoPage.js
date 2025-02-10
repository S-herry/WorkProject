const NoPage = ({ is_admin }) => {
  is_admin ? (window.location.href = "/admin") : (window.location.href = "/");

  return null;
};

export default NoPage;
