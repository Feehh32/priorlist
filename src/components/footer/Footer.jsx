const Footer = () => {
  return (
    <footer className="bg-secondary text-white text-center py-4">
      <p className="font-secondary">
        &copy; {new Date().getFullYear()} PriorList
      </p>
    </footer>
  );
};

export default Footer;
