
<?php
// Définir le type de contenu comme XML
header('Content-Type: application/xml; charset=utf-8');

// Format de date W3C (ISO 8601) avec fuseau horaire UTC
$currentDate = date('Y-m-d\TH:i:s\Z');

// Générer le XML
echo '<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Pages publiques en anglais -->
  <url>
    <loc>https://pizzametrix.com/</loc>
    <lastmod>' . $currentDate . '</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
  
  <!-- Pages publiques en français -->
  <url>
    <loc>https://pizzametrix.com/fr</loc>
    <lastmod>' . $currentDate . '</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
  
  <!-- Pages d\'authentification en français -->
  <url>
    <loc>https://pizzametrix.com/fr/login</loc>
    <lastmod>' . $currentDate . '</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <url>
    <loc>https://pizzametrix.com/fr/sign-in</loc>
    <lastmod>' . $currentDate . '</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <url>
    <loc>https://pizzametrix.com/fr/reset-password</loc>
    <lastmod>' . $currentDate . '</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.5</priority>
  </url>
  
  <!-- Pages d\'authentification en anglais -->
  <url>
    <loc>https://pizzametrix.com/login</loc>
    <lastmod>' . $currentDate . '</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <url>
    <loc>https://pizzametrix.com/sign-in</loc>
    <lastmod>' . $currentDate . '</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <url>
    <loc>https://pizzametrix.com/reset-password</loc>
    <lastmod>' . $currentDate . '</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.5</priority>
  </url>
  
  <!-- Pages légales en anglais -->
  <url>
    <loc>https://pizzametrix.com/terms</loc>
    <lastmod>' . $currentDate . '</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.7</priority>
  </url>
  
  <url>
    <loc>https://pizzametrix.com/privacy</loc>
    <lastmod>' . $currentDate . '</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.7</priority>
  </url>
  
  <!-- Pages légales en français -->
  <url>
    <loc>https://pizzametrix.com/fr/terms</loc>
    <lastmod>' . $currentDate . '</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.7</priority>
  </url>
  
  <url>
    <loc>https://pizzametrix.com/fr/privacy</loc>
    <lastmod>' . $currentDate . '</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.7</priority>
  </url>
  
  <!-- Redirection automatique de langue -->
  <url>
    <loc>https://pizzametrix.com/auto</loc>
    <lastmod>' . $currentDate . '</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>';
?>
