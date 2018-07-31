<?php
  $title = get_the_title();
  $desc = get_field('description');
  $image = get_field('image');
  $video = get_field('video');
  $links = get_field('links');
  $id = get_the_ID();
?>

<div class='section'>
  <div class='section__inner'>
    <div class='section-title'><?php echo $title; ?>.</div>
    <?php if ($desc): ?>
      <div class='section-description'><?php echo $desc; ?></div>
    <?php endif;
      if ($links): ?>
      <div class='section-links'>
        <?php foreach($links as $link): ?>
          <a class='link' href='<?php echo $link['url']; ?>' target='_blank'><?php echo $link['label']; ?></a>
        <?php endforeach; ?>
      </div>
    <?php endif;
      if ($image):
        $imageId = 'image-' . $id;
        $wrapperId = 'wrapper-' . $id;
        ?>
      <div id='<?php echo $wrapperId; ?>' data-target='<?php echo '#' . $imageId; ?>' class='section-image'>
        <img id='<?php echo $imageId; ?>' data-target='<?php echo '#' . $wrapperId; ?>' src='<?php echo $image['url']; ?>' />
      </div>
    <?php endif;
      if ($video): ?>
      <div class='section-video'>
        <div class='section-video__inner'>
          <?php echo $video; ?>
        </div>
      </div>
    <?php endif; ?>
  </div>
</div>
