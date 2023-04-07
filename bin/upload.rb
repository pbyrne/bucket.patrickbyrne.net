require "date"
require "json"
require "optparse"
require "optparse/date"

options = Struct.new("Options", :date, :name, :url, :verbose).new
options.date = Date.today.strftime("%Y-%m-%d")

parser = OptionParser.new do |opts|
  opts.banner = "Usage: upload.rb --name=NAME --url=URL [options]"

  opts.on("-h", "--help", "Prints this help") do
    puts opts
    exit
  end

  opts.on("-nNAME", "--name=NAME", "Name to use for the uploaded file (e.g., lol.jpg)") do |value|
    options.name = value
  end

  opts.on("-uURL", "--url=URL", "The URL to download the image being added (e.g., https://example.com/source.jpg)") do |value|
    options.url = value
  end

  opts.on("-dDATE", "--date=DATE", Date, "The date to display as having been added (default: #{options.date})") do |value|
    options.date = value
  end

  opts.on("--[no-]verbose", "Include debug output") do |value|
    options.verbose = value
  end
end
parser.parse!

if options.name.nil? || options.url.nil?
  STDERR.puts "Missing arguments!"
  STDERR.puts parser.help
  exit 1
end

class Upload
  attr_accessor :data, :options

  B2_BUCKET = ENV.fetch("B2_BUCKET", "bucket-patrickbyrne-net")
  IMAGES_JSON = ENV.fetch("IMAGES_JSON", "images.json")

  def initialize(options)
    self.options = options
  end

  def call
    STDERR.puts options if verbose

    self.data = fetch_image_data
    self.image = download_image
  end

  private def fetch_image_data
    destination = Tempfile.new
    shell_out("b2 download-file-by-name #{B2_BUCKET} #{IMAGES_JSON} #{destination.path}")
    JSON.load_file(destination.path)
  end

  private def push_image_data
    destination = Tempfile.new
    JSON.dump(image_data, destination)
    shell_out("b2 upload-file #{B2_BUCKET} #{destination.path} #{IMAGES_JSON}")
  end

  private def shell_out(cmd)
    Open3.popen3(cmd) do |stdin, stdout, stderr|
      STDERR.puts "Running the command #{cmd.inspect}…"
    end
  end

  private def verbose?
    options.verbose
  end
end

Upload.new(options).call
