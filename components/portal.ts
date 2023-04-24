import reactDom from "react-dom";

interface Props {
  children: React.ReactNode;
}

const TagModalPortal = ({ children }: Props) => {
  const el =
    typeof window !== "undefined" && document.getElementById("tag-modal");
  return el && children ? reactDom.createPortal(children, el) : null;
};

export default TagModalPortal;
