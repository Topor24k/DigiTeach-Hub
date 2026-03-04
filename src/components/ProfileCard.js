import React from 'react';
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';
import './ProfileCard.css';

const ProfileCard = ({ name, role, description, avatarColor, image }) => {
  const initials = name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <article className="profile-card">
      {/* Banner */}
      <div className="profile-card__banner">
        <div className="profile-card__banner-pattern" />
      </div>

      {/* Avatar */}
      <div
        className="profile-card__avatar"
        style={image ? {} : { background: avatarColor || 'var(--color-accent)' }}
      >
        {image ? (
          <img src={image} alt={name} className="profile-card__avatar-img" />
        ) : (
          <span className="profile-card__initials">{initials}</span>
        )}
      </div>

      {/* Body */}
      <div className="profile-card__body">
        <h3 className="profile-card__name">{name}</h3>
        {role && <span className="profile-card__role">{role}</span>}
        <p className="profile-card__desc">{description}</p>
      </div>

      {/* Socials */}
      <div className="profile-card__socials">
        <a href="#facebook" className="profile-card__social" aria-label="Facebook">
          <FaFacebook />
        </a>
        <a href="#instagram" className="profile-card__social" aria-label="Instagram">
          <FaInstagram />
        </a>
        <a href="#linkedin" className="profile-card__social" aria-label="LinkedIn">
          <FaLinkedin />
        </a>
      </div>
    </article>
  );
};

export default ProfileCard;
