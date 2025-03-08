<?php
header('Content-Type: application/xml; charset=utf-8');
$currentDate = date('Y-m-d');
echo '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Pages publiques en anglais -->
  <url>
    <loc>https://pizzametrix.com/</loc>
    <lastmod><?php echo $currentDate; ?></lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
  
  <!-- Pages publiques en français -->
  <url>
    <loc>https://pizzametrix.com/fr</loc>
    <lastmod><?php echo $currentDate; ?></lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
  
  <!-- Pages d'authentification -->
  <url>
    <loc>https://pizzametrix.com/login</loc>
    <lastmod><?php echo $currentDate; ?></lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <url>
    <loc>https://pizzametrix.com/sign-in</loc>
    <lastmod><?php echo $currentDate; ?></lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <url>
    <loc>https://pizzametrix.com/reset-password</loc>
    <lastmod><?php echo $currentDate; ?></lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.5</priority>
  </url>
  
  <!-- Pages légales en anglais -->
  <url>
    <loc>https://pizzametrix.com/terms</loc>
    <lastmod><?php echo $currentDate; ?></lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.7</priority>
  </url>
  
  <url>
    <loc>https://pizzametrix.com/privacy</loc>
    <lastmod><?php echo $currentDate; ?></lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.7</priority>
  </url>
  
  <!-- Pages légales en français -->
  <url>
    <loc>https://pizzametrix.com/fr/terms</loc>
    <lastmod><?php echo $currentDate; ?></lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.7</priority>
  </url>
  
  <url>
    <loc>https://pizzametrix.com/fr/privacy</loc>
    <lastmod><?php echo $currentDate; ?></lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.7</priority>
  </url>
  
  <!-- Redirection automatique de langue -->
  <url>
    <loc>https://pizzametrix.com/auto</loc>
    <lastmod><?php echo $currentDate; ?></lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>
