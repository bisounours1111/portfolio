export const profile = {
  name: 'Yanis DAÏ',
  email: 'yan.dai@outlook.fr',
  phone: '+33 6 46 53 09 03',
  phoneHref: 'tel:+33646530903',
  linkedin: 'https://www.linkedin.com/in/yanis-da%C3%AF-834443257/',
  github: '',
}

export function getSocialLinks(profileData) {
  const links = [
    { href: `mailto:${profileData.email}`, icon: 'bx bx-mail-send' },
    { href: profileData.linkedin, icon: 'bx bxl-linkedin-square', external: true },
    { href: profileData.phoneHref, icon: 'bx bx-phone-call' },
  ]

  if (profileData.github) {
    links.splice(2, 0, {
      href: profileData.github,
      icon: 'bx bxl-github',
      external: true,
    })
  }

  return links
}
