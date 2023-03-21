import '../styles/styleFooter.css';

export default function Footer({ClassName}) 
{
  return (
    <footer id={ClassName}>
      <div>
        <p>Copyright © 2023</p>
      </div>
      <div>
        <p>Mentions légales</p>
      </div>
    </footer>
  );
}