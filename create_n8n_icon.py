from PIL import Image, ImageDraw, ImageFont

# Create a high-quality n8n icon
img = Image.new('RGBA', (256, 256), color=(255, 255, 255, 0))
draw = ImageDraw.Draw(img)

# n8n brand color (coral/salmon)
bg_color = (234, 85, 75)

# Draw circle background
circle_radius = 110
center = 128
draw.ellipse(
    [center - circle_radius, center - circle_radius, 
     center + circle_radius, center + circle_radius],
    fill=bg_color
)

# Draw text
try:
    font = ImageFont.truetype('arial.ttf', 80)
except:
    try:
        font = ImageFont.truetype('C:\\Windows\\Fonts\\arial.ttf', 80)
    except:
        font = ImageFont.load_default()

text = 'n8n'
bbox = draw.textbbox((0, 0), text, font=font)
text_width = bbox[2] - bbox[0]
text_height = bbox[3] - bbox[1]
text_x = (256 - text_width) // 2
text_y = (256 - text_height) // 2 - 10

draw.text((text_x, text_y), text, fill=(255, 255, 255), font=font)

# Save icon
output_path = 'keep-ui/public/icons/n8n-icon.png'
img.save(output_path)
print(f'✓ High-quality n8n icon created at: {output_path}')
print(f'  Size: {img.size}')
print(f'  Format: PNG with transparency')
